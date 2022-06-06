Public Class NSFormas
    Private cn As Nomade.Connection
    'COMENTARIO PARA PRUEBA
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Formas(ByVal p_GTVOBJT_CODE As String, ByVal p_GTVOBJT_ESTADO_IND As String, ByVal p_GTVOBJT_SIST_CODE As String, Optional p_TIPO_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_FORMAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_CODE", p_GTVOBJT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_ESTADO_IND", p_GTVOBJT_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_SIST_CODE", p_GTVOBJT_SIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253)) 'W=Web;E=Escritorio  
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

    Public Function Crear_Formas(ByVal p_GTVOBJT_CODE As String, ByVal p_GTVOBJT_DESC As String, ByVal p_GTVOBJT_ESTADO_IND As String, ByVal p_GTVOBJT_SIST_CODE As String, ByVal p_GTVOBJT_USUA_ID As String,
                                 ByVal p_TIPO_IND As String, ByVal p_AYUDA As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_FORMAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_CODE", p_GTVOBJT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_DESC", p_GTVOBJT_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_ESTADO_IND", p_GTVOBJT_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_SIST_CODE", p_GTVOBJT_SIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_USUA_ID", p_GTVOBJT_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AYUDA", p_AYUDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_GENERADO").Value

            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Formas(ByVal p_GTVOBJT_CODE As String, ByVal p_GTVOBJT_DESC As String, ByVal p_GTVOBJT_ESTADO_IND As String, ByVal p_GTVOBJT_SIST_CODE As String, ByVal p_GTVOBJT_USUA_ID As String,
                                      ByVal p_TIPO_IND As String, ByVal p_AYUDA As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_FORMAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_CODE", p_GTVOBJT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_DESC", p_GTVOBJT_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_ESTADO_IND", p_GTVOBJT_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_SIST_CODE", p_GTVOBJT_SIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVOBJT_USUA_ID", p_GTVOBJT_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AYUDA", p_AYUDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_GENERADO").Value

            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
