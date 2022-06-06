Public Class NCRegimenPen
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarRegimenP(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_ESTADO_ID As String, Optional p_TIPO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_REGIMEN_PENSIONARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_RegimenP(ByVal p_COD_SUNAT As String, ByVal p_DESC As String, _
     ByVal p_F_INICIO As String, ByVal p_F_FIN As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, ByVal p_Tip As String, ByVal p_Pdim As String, ByVal p_FCOSIPE_CTLG_CODE As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_REGIMEN_PENSIONARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SUNAT", p_COD_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_INICIO", p_F_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_F_FIN", DevuelveNulo(p_F_FIN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIP", p_Tip, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_PDIM", p_Pdim, ParameterDirection.Input, 253))
            If p_Pdim = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PDIM", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PDIM", p_Pdim, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_FCOSIPE_CTLG_CODE", p_FCOSIPE_CTLG_CODE, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_CODE_GENERADO").value
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_RegimenP(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESCRIPCION As String, _
    ByVal p_FECHA_INI As String, ByVal p_FECHA_FIN As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String, ByVal p_Tip As String, ByVal p_Pdim As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_REGIMEN_PENSION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", DevuelveNulo(p_FECHA_FIN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIP", p_Tip, ParameterDirection.Input, 1))
            If p_Pdim = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PDIM", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PDIM", p_Pdim, ParameterDirection.Input, 253))
            End If

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").value
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstado_RegimenP(ByVal p_CODE As String) As Array
        Try

            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_REGIMEN_PENSIONARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Fecha", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_ESTADO").Value
            Dim Fecha As String = cmd1.Parameters("@p_Fecha").Value
            If Fecha <> "" Then
                msg(1) = Convert.ToDateTime(Fecha).ToString("dd/MM/yyyy")
            End If

            'msg(1) = cmd1.Parameters("@p_Fecha").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function DevuelveNulo(ByVal p_Value As Object) As Object

        If Trim(p_Value) = String.Empty Then
            Return DBNull.Value
        Else
            Return p_Value
        End If

    End Function

End Class
