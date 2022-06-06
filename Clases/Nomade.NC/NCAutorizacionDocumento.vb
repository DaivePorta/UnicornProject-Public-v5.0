Public Class NCAutorizacionDocumento

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarAutorizacion(ByVal P_CODE As String, ByVal P_ESTADO_IND As String, Optional ByVal P_CTLG_CODE As String = "", Optional ByVal P_SCSL_CODE As String = "",
                                       Optional ByVal P_TIPO_DOC_CODE As String = "", Optional ByVal P_CORRELATIVO As String = "", Optional ByVal P_ALMACEN As String = "",
                                       Optional ByVal P_CAJA As String = "", Optional P_VENDEDOR As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_AUTORIZACION_DOC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DOC_CODE", P_TIPO_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORRELATIVO", P_CORRELATIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN", P_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA", P_CAJA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VENDEDOR", P_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

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

    Public Function CrearAutorizacion(ByVal P_EMISION As String, ByVal P_CTLG_CODE As String,
                                      ByVal P_SCSL_CODE As String, ByVal P_TIPO_DOC As String,
                              ByVal P_AUTORIZACION As String, ByVal P_CORRELATIVO As String,
                              ByVal P_CAJA_CODE As String, ByVal P_ALMACEN_CODE As String,
                              ByVal P_PIDM_VENDEDOR As String,
                              ByVal P_TIPO_CAMPO As String, ByVal P_NRO_DIGITOS As String, ByVal P_NRO_LINEAS As String,
                              ByVal P_SERIE As String, ByVal P_INI As String, ByVal P_FIN As String,
                              ByVal P_FORMATO As String, ByVal P_ESTADO As String,
                              ByVal P_IMPRENTA As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String,
                              ByVal P_IMPR_CODE As String, ByVal P_FORMATO_TICKET_IND As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_AUTORIZACION_DOC", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_EMISION", P_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DOC", P_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_AUTORIZACION", P_AUTORIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORRELATIVO", P_CORRELATIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN_CODE", P_ALMACEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_VENDEDOR", P_PIDM_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_CAMPO", P_TIPO_CAMPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_DIGITOS", P_NRO_DIGITOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_LINEAS", P_NRO_LINEAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INI", P_INI, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FIN", P_FIN, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FORMATO", P_FORMATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPRENTA", P_IMPRENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPR_CODE", P_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FORMATO_TICKET_IND", P_FORMATO_TICKET_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value & ","
            msg &= cmd1.Parameters("@P_INI").Value & ","
            msg &= cmd1.Parameters("@P_FIN").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarAutorizacion(ByVal P_CODE As String, ByVal P_EMISION As String,
                              ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_TIPO_DOC As String,
                              ByVal P_AUTORIZACION As String, ByVal P_CORRELATIVO As String,
                              ByVal P_CAJA_CODE As String, ByVal P_ALMACEN_CODE As String,
                              ByVal P_PIDM_VENDEDOR As String,
                              ByVal P_TIPO_CAMPO As String, ByVal P_NRO_DIGITOS As String, ByVal P_NRO_LINEAS As String,
                              ByVal P_SERIE As String, ByVal P_INI As String, ByVal P_FIN As String,
                              ByVal P_FORMATO As String, ByVal P_ESTADO As String,
                              ByVal P_IMPRENTA As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String,
                              ByVal P_IMPR_CODE As String, ByVal P_FORMATO_TICKET_IND As String) As String
        Try
            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_AUTORIZACION_DOC", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EMISION", P_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DOC", P_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_AUTORIZACION", P_AUTORIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORRELATIVO", P_CORRELATIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN_CODE", P_ALMACEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_VENDEDOR", P_PIDM_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_CAMPO", P_TIPO_CAMPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_DIGITOS", P_NRO_DIGITOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_LINEAS", P_NRO_LINEAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INI", P_INI, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FIN", P_FIN, ParameterDirection.InputOutput, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FORMATO", P_FORMATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPRENTA", P_IMPRENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPR_CODE", P_IMPR_CODE, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK,"
            msg &= cmd.Parameters("@P_INI").Value & ","
            msg &= cmd.Parameters("@P_FIN").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoAutorizacion(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_AUTORIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoTicket(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_TICKET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarValoresAutorizacion(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_TIPO_DC As String, ByVal P_SERIE As String, ByVal P_CORRELATIVO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_VALORES_AUT_DOC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DC", P_TIPO_DC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORRELATIVO", P_CORRELATIVO, ParameterDirection.Input, 253))

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

    Public Function VerificarSerieNumeroDocumento(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_TIPO_DC As String, ByVal P_CORRELATIVO_IND As String,
                                                  ByVal P_CAJA_CODE As String, ByVal P_VENDEDOR_PIDM As String, ByVal P_FORMATO As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_AUTORIZACION_NUMERACION_ACTUAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DOC_CODE", P_TIPO_DC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORRELATIVO", P_CORRELATIVO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VENDEDOR", P_VENDEDOR_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FORMATO", P_FORMATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

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

End Class
