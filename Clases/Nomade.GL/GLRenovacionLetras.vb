Public Class GLRenovacionLetras


    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarRenovacion(ByVal p_codigo As String, Optional ByVal p_maestra As String = "N", Optional ByVal p_ctlg As String = "", Optional p_tipo As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_RENOVACION_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MAESTRA", p_maestra, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))


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


    Public Function CrearRenovacion(ByVal p_nro_doc As String,
                                       ByVal p_code_detalle As String,
                                       ByVal p_user As String, ByVal p_code As String, ByVal p_nro_detalle As String, ByVal p_ctlg As String,
                                        ByVal p_fecha_giro As String, ByVal p_lugar_giro As String, ByVal p_tipo As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_CREAR_RENOVACION_LETRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_nro_doc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DETALLE", p_code_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DETALLE", p_nro_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_GIRO", p_fecha_giro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUGAR_GIRO", p_lugar_giro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function EliminarRenovacion(ByVal p_codigo As String, ByVal p_item As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFL_ELIMINAR_RENOVACION_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_item, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"



            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function





End Class
